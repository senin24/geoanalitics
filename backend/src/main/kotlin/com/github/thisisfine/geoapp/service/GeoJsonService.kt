package com.github.thisisfine.geoapp.service

import com.github.thisisfine.geoapp.model.Event
import com.github.thisisfine.geoapp.model.EventRepository
import com.github.thisisfine.geoapp.web.Feature
import com.github.thisisfine.geoapp.web.FeatureCollection
import org.springframework.stereotype.Service
import java.time.ZoneOffset

import java.time.ZoneId

import java.time.format.DateTimeFormatter


@Service
class GeoJsonService(
    private val eventRepository: EventRepository
) {

    companion object {
        val formatter: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
            .withZone(ZoneId.from(ZoneOffset.UTC))
    }


    fun getAllEvents(): FeatureCollection =
        eventRepository.findAll()
            .map { event -> mapToFeature(event) }
            .toList()
            .let { eventFeatures ->
                FeatureCollection(
                    features = eventFeatures
                )
            }

    fun getEventById(id: String): Feature? =
        eventRepository.findById(id)
            .orElse(null)
            ?.let { event -> mapToFeature(event) }

    private fun mapToFeature(event: Event): Feature =
        Feature(
            geometry = Feature.Geometry(
                coordinates = arrayOf(event.x, event.y)
            ),
            properties = Feature.Property(
                id = event.id,
                type = event.type,
                source = event.source,
                date = event.date.toString(),
                title = event.title,
                text = event.text,
                special = event.special,
                address = Feature.Property.Address(
                    region = event.region,
                    place = event.place,
                    street = event.street,
                    building = event.building,
                ),
                coordinates = Feature.Property.Coordinates(
                    x = event.x,
                    y = event.y
                ),
                importance = event.importance,
                links = event.links?.toList()
            )
        )


}