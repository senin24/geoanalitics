package com.github.thisisfine.geoapp.mapper

import com.github.thisisfine.geoapp.dto.EventsDto
import com.github.thisisfine.geoapp.model.Event

class EventDtoMapper()
{
    fun mapEventEntityToDto(event:Event):EventsDto.Event{
        return EventsDto.Event(
            id = event.id.toString(),
            type = event.type,
            source = event.source,
            date = event.date.toString(),
            title = event.title,
            text = event.text,
            special = event.special,
            coordinates = mapEventEntityCoordinatesToDto(event),
            importance = event.importance.toInt(),
            links = event.links,
            address = mapEventEntityAddressToDto(event)
        )
    }

    fun mapEventEntityAddressToDto(event: Event):EventsDto.Event.Address{
        return EventsDto.Event.Address(
            region = event.region,
            place = event.place,
            street = event.street,
            building = event.building
        )
    }

    fun mapEventEntityCoordinatesToDto(event: Event):EventsDto.Event.Coordinates{
        return EventsDto.Event.Coordinates(
            x = event.x!!.toInt(),
            y = event.y!!.toInt()
        )
    }
}