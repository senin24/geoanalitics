package com.github.thisisfine.geoapp.web

import com.github.thisisfine.geoapp.dto.EventsDto
import com.github.thisisfine.geoapp.dto.GeocodeRequestParams
import com.github.thisisfine.geoapp.dto.GeocodeResponse
import com.github.thisisfine.geoapp.model.Event
import com.github.thisisfine.geoapp.model.EventRepository
import com.github.thisisfine.geoapp.model.GeocodeData
import com.github.thisisfine.geoapp.model.getAddress
import com.github.thisisfine.geoapp.service.GisClient
import org.locationtech.jts.geom.Coordinate
import org.locationtech.jts.geom.GeometryFactory
import org.locationtech.jts.geom.Point
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.text.SimpleDateFormat

@RestController
class RestEventDtoController(
    private val eventRepository: EventRepository,
    private val gisClient: GisClient
) {
    val df = SimpleDateFormat("dd.MM.yyyy")

    @PostMapping("/")
    fun saveEventDtoToDb(@RequestBody eventsDto: EventsDto) {
        val geocodedEvents: List<Event> = eventsDto.events.mapNotNull { eventDto ->
            val geocode: GeocodeData = geocoder(eventDto)
            Event(
                id = eventDto.id,
                type = eventDto.type,
                source = eventDto.source,
                date = df.parse(eventDto.date).toInstant(),
                title = eventDto.title,
                text = eventDto.text,
                special = eventDto.special,
                x = geocode.x,
                y = geocode.y,
                geom = createGeometryPoint(geocode),
                importance = BigDecimal(eventDto.importance),
                region = eventDto.address?.region,
                place = eventDto.address?.place,
                street = eventDto.address?.street,
                building = eventDto.address?.building,
                links = eventDto.links?.toSet()
            )
        }.toList()
        eventRepository.saveAll(geocodedEvents)
    }

    fun geocoder(eventDto: EventsDto.Event): GeocodeData {
        val xDto: BigDecimal? = eventDto.coordinates?.x
        val yDto: BigDecimal? = eventDto.coordinates?.y
        if (xDto != null && yDto != null) return GeocodeData(
            x = xDto,
            y = yDto
        )
        val address = getAddress(eventDto)

        val geocodeResponse: GeocodeResponse =
            gisClient.getGeocodedAddress(GeocodeRequestParams(q = address)) ?: return GeocodeData()
        if (geocodeResponse.result.items.isEmpty()) {
            println(geocodeResponse.result)
            return GeocodeData()
        }
        return GeocodeData(
            y = geocodeResponse.result.items[0].point.lat.toBigDecimal(),
            x = geocodeResponse.result.items[0].point.lon.toBigDecimal(),
            addressGeocoded = geocodeResponse.result.items[0].fullName
        )
    }

    fun createGeometryPoint(geocodeData: GeocodeData): Point? {
        if (geocodeData.x == null || geocodeData.y == null) return null
        val point = GeometryFactory().createPoint(Coordinate(geocodeData.x.toDouble(), geocodeData.y.toDouble()))
        point.srid = 4326
        return point
    }

}