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
import org.springframework.web.multipart.MultipartFile
import java.math.BigDecimal
import java.nio.charset.StandardCharsets
import java.time.Instant

@Service
class UploadService(
    private val eventRepository: EventRepository,
    private val gisClient: GisClient
) {

    companion object {
        private val objectMapper = ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .registerModules(KotlinModule())
    }

    fun uploadJsontoPostGis(file: MultipartFile) {

        val eventsFromJson = objectMapper.readValue(String(file.bytes, StandardCharsets.UTF_8), EventsDto::class.java)

        val geocodedEvents: List<Event> = eventsFromJson.events
            .mapNotNull { eventDto ->
                val geocode: GeocodeData = geocoder(eventDto.address?.shortAddress) ?: return@mapNotNull null
                Event(
                    id = eventDto.id.toLong(),
                    type = eventDto.type,
                    source = eventDto.source,
                    date = Instant.parse(eventDto.date),
                    title = eventDto.title,
                    text = eventDto.text,
                    special = eventDto.special,
                    x = BigDecimal(eventDto.coordinates?.x?:0),
                    y = BigDecimal(eventDto.coordinates?.y?:0),
                    geom = createGeometryPoint(
                        longitude = geocode.longitude.toDouble(),
                        latitude = geocode.longitude.toDouble()),
                    importance = BigDecimal(eventDto.importance),
                    region = eventDto.address?.region,
                    place = eventDto.address?.place,
                    street = eventDto.address?.street,
                    building = eventDto.address?.building,
                    links = eventDto.links
                    )
            }.toList()
        eventRepository.saveAll(geocodedEvents)
    }

    private fun geocoder(addressShort: String?): GeocodeData? {
        val geocodeResponse: GeocodeResponse =
            gisClient.getGeocodedAddress(GeocodeRequestParams(q = addressShort)) ?: return null
        if (geocodeResponse.result.items.isEmpty()) {
            println(geocodeResponse.result)
            return null
        }
        return GeocodeData(
            latitude = geocodeResponse.result.items[0].point.lat.toBigDecimal(),
            longitude = geocodeResponse.result.items[0].point.lon.toBigDecimal(),
            addressGeocoded = geocodeResponse.result.items[0].fullName
        )
    }

    fun createGeometryPoint(longitude: Double, latitude: Double): Point {
        val point = GeometryFactory().createPoint(Coordinate(longitude, latitude))
        point.srid = 4326
        return point
    }
}

data class GeocodeData(
    val latitude: BigDecimal,
    val longitude: BigDecimal,
    val addressGeocoded: String
)