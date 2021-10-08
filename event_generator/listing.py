import codecs
import config
import json
import random


class BaseListing:
    file_name = ""
    items = None

    def __init__(self):
        self.load()

    def get_file_path(self):
        return "{}/{}".format(config.list_folder, self.file_name)

    def load(self):
        with codecs.open(self.get_file_path(), "r", encoding="utf-8") as reader:
            self.items = json.load(reader)

    def random(self):
        return self.items[random.randint(0, len(self.items) - 1)]

    def save(self):
        with open(self.get_file_path(), "w") as writer:
            json.dump(self.items, writer)


class Address(BaseListing):
    file_name = config.address_list_file

    def load(self):
        with codecs.open(self.get_file_path(), "r", encoding="utf-8") as reader:
            self.items = reader.readlines()
            self.items.pop(0)


class Id(BaseListing):
    file_name = config.id_list_file

    def add(self, value):
        self.items = value
        self.save()

    def get_max(self):
        if self.items:
            return self.items
        else:
            return 0


class Importance(BaseListing):
    file_name = config.importance_list_file


class Source(BaseListing):
    file_name = config.source_list_file


class Special(BaseListing):
    file_name = config.special_list_file


class Text(BaseListing):
    file_name = config.text_list_file


class Title(BaseListing):
    file_name = config.title_list_file


class Type(BaseListing):
    file_name = config.type_list_file
