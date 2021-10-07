package com.github.thisisfine.geoapp.model

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.github.thisisfine.geoapp.dto.EventsDto
import com.github.thisisfine.geoapp.dto.GeocodeRequestParams
import com.github.thisisfine.geoapp.dto.GeocodeResponse
import com.github.thisisfine.geoapp.service.GisClient
import org.locationtech.jts.geom.Coordinate
import org.locationtech.jts.geom.GeometryFactory
import org.locationtech.jts.geom.Point
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.multipart.MultipartFile
import java.math.BigDecimal
import java.nio.charset.StandardCharsets
import java.text.SimpleDateFormat
import java.time.Instant
import java.util.*


@Service
class UploadService(
    private val eventRepository: EventRepository,
    private val gisClient: GisClient
) {
    val df = SimpleDateFormat("dd.MM.yyyy")

    companion object {
        private val objectMapper = ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .registerModules(KotlinModule())
    }

    fun uploadEvents(file: MultipartFile) {

        df.timeZone = TimeZone.getTimeZone("UTC+3")

        val eventsDtoFromJson: EventsDto = objectMapper.readValue(String(file.bytes, StandardCharsets.UTF_8), EventsDto::class.java)

        val geocodedEvents: List<Event> = eventsDtoFromJson.events
            .mapNotNull { eventDto ->
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

    fun saveEventDtoToDb(eventsDto: EventsDto) {
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

    private fun geocoder(eventDto: EventsDto.Event): GeocodeData {
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

data class GeocodeData(
    val y: BigDecimal? = null,
    val x: BigDecimal? = null,
    val addressGeocoded: String? = null
)

fun getAddress(eventDto: EventsDto.Event): String? {
    val streetAddress =
        listOfNotNull(eventDto.address?.street, eventDto.address?.building).joinToString(separator = " ")
    return listOfNotNull(
        eventDto.address?.region,
        eventDto.address?.place,
        streetAddress
    ).joinToString(separator = ", ")
}