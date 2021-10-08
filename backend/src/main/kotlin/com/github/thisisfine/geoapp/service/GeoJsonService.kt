package com.github.thisisfine.geoapp.service

import com.github.thisisfine.geoapp.model.Event
import com.github.thisisfine.geoapp.model.EventRepository
import com.github.thisisfine.geoapp.web.CoordinatesDto
import com.github.thisisfine.geoapp.web.Feature
import com.github.thisisfine.geoapp.web.FeatureCollection
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.time.ZoneId
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter


@Service
class GeoJsonService(
    private val eventRepository: EventRepository
) {

    companion object {
        val formatter: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
            .withZone(ZoneId.from(ZoneOffset.UTC))
    }

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
    fun getAllEventsByParams(type: String?, source: String?, startDate: String?, endDate: String?): FeatureCollection {

        if (listOfNotNull(type, source, startDate, endDate).none { s -> s.isNotEmpty() }) {
            return getFeatureCollectionFromEvents(eventRepository.findAll())
        }

        val spec: Specification<Event> = if (endDate == null || endDate.isEmpty()) {
            val startDateInst: Instant? = startDate?.let { Instant.parse(it) }
            getSpecificationEqual(type, source, startDateInst)
        } else {
            val startDateInst: Instant = Instant.parse(startDate)
            val endDateInst: Instant = Instant.parse(endDate)
            getSpecificationBetween(type, source, startDateInst, endDateInst)
        }

        return getFeatureCollectionFromEvents(eventRepository.findAll(spec))
    }

    private fun getSpecificationEqual(type: String?, source: String?, startDateInst: Instant?): Specification<Event> =
        Specification.where(attributeEquals("type", type))
            .and(attributeEquals("source", source))
            .and(attributeEquals("date", startDateInst))

    private fun getSpecificationBetween(
        type: String?,
        source: String?,
        startDateInst: Instant,
        endDateInst: Instant
    ): Specification<Event> =
        Specification.where(attributeEquals("type", type))
            .and(attributeEquals("source", source))
            .and(attributeBetween("date", startDateInst, endDateInst))

    private fun <T> attributeEquals(attributeName: String, value: T?): Specification<Event> {
        return Specification { root, query, criteriaBuilder ->
            value?.let {
                criteriaBuilder.equal(
                    root.get<T>(attributeName),
                    value
                )
            }
        }
    }

    private fun attributeBetween(
        attributeName: String,
        startDateInst: Instant,
        endDateInst: Instant
    ): Specification<Event> {
        return Specification { root, query, criteriaBuilder ->
            criteriaBuilder.between(root.get(attributeName), startDateInst, endDateInst)
        }
    }


    private fun getFeatureCollectionFromEvents(events: List<Event>): FeatureCollection =
        events
            .map { event -> mapToFeature(event) }
            .toList()
            .let { eventFeatures ->
                FeatureCollection(
                    features = eventFeatures
                )
            }

    @Transactional
    fun updateEventCoordinates(id: String, coordinates: CoordinatesDto): Feature? =
        eventRepository.findById(id)
            .orElse(null)
            ?.copy(
                x = coordinates.x,
                y = coordinates.y
            )
            ?.let { updatedEvent -> eventRepository.save(updatedEvent) }
            ?.let { savedEvent -> mapToFeature(savedEvent)}

}