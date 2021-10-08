import codecs
import config
import datetime
import json
import listing
import random
import ssl
import time
import urllib2


class Address:
    building = None
    place = None
    region = None
    street = None
    x = None
    y = None

    def set_address(self, string):
        parts = string.strip().split(";")

        # region
        if parts[1] == "":
            self.region = ""
        else:
            self.region = parts[1]

        # place
        place_parts = []
        if parts[2] != "":
            place_parts.append(parts[2])

        if parts[3] != "" and parts[3] not in place_parts:
            place_parts.append(parts[3])

        if len(place_parts):
            self.place = ", ".join(place_parts)
        else:
            self.place = ""

        # street
        street_parts = []
        if parts[4] != "":
            street_parts.append(parts[4])

        if parts[5] != "":
            street_parts.append(parts[5])

        if parts[6] != "":
            street_parts.append(parts[6])

        if len(street_parts):
            self.street = " ".join(street_parts)
        else:
            self.street = ""

        if self.street != "":
            self.building = parts[7]

        # x
        if parts[8] == "":
            self.x = ""
        else:
            self.x = float(parts[8])

        # y
        if parts[9] == "":
            self.y = ""
        else:
            self.y = float(parts[9])

    def get_address(self):
        result = {
            "place": self.place
        }

        if self.region is not None and random_boolean(9):
            result["region"] = self.region

        if self.street is not None and random_boolean(8):
            result["street"] = self.street

        if self.building is not None and random_boolean(8):
            result["building"] = self.building

        return result

    def get_coordinates(self):
        return {
            "x": self.x,
            "y": self.y
        }


def create_event():
    id_string = str(ids.get_max() + 1)

    address.set_address(addresses.random())

    event = {
        "address": address.get_address(),
        "date": datetime.date.fromordinal(datetime.date.today().toordinal() + random.randint(-7, 7)).strftime("%d.%m.%Y"),
        "id": id_string,
        "importance": importances.random(),
        "source": sources.random(),
        "special": special.random(),
        "text": text.random() + id_string,
        "title": title.random() + id_string,
        "type": types.random()
    }

    if random_boolean(5):
        event["coordinates"] = address.get_coordinates()

    if random_boolean(5):
        link_value = ids.get_max() / 10 + ids.get_max() / 100
        if link_value > 0:
            event["links"] = [link_value]

    ids.add(int(event["id"]))

    return event


def create_file():
    result = {
        "events": []
    }

    for index in range(config.event_count):
        event = create_event()

        result["events"].append(event)

    save(json.dumps(result, ensure_ascii=False))


def create_request():
    send_request(
        json.dumps({
            "events": [
                create_event()
            ]
        })
    )


def random_boolean(ver=7):
    return random.randint(0, 10) <= ver


def send_events():
    while True:
        create_request()
        time.sleep(config.api_sleep_time)


def send_request(data):
    try:
        urllib2.urlopen(
            urllib2.Request(
                url=config.api_url,
                data=data,
                headers={
                    "Content-Type": "application/json"
                }
            ),
            context=ssl._create_unverified_context()
        )
        print "\n*\n", data, "\n", "request success"

    except Exception as exc:
        print exc.message


def save(data):
    with codecs.open(config.event_file, "w", encoding="utf-8") as writer:
        writer.write(data)


if __name__ == "__main__":
    address = Address()
    addresses = listing.Address()
    ids = listing.Id()
    importances = listing.Importance()
    sources = listing.Source()
    special = listing.Special()
    text = listing.Text()
    title = listing.Title()
    types = listing.Type()

    if config.do_event_file:
        create_file()
    else:
        send_events()
