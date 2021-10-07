package com.github.thisisfine.geoapp.dto


import com.fasterxml.jackson.annotation.JsonProperty
import java.math.BigDecimal

//TODO Андрей,  укажи какие поля нулабельны
data class EventsDto(
    @JsonProperty("events")
    val events: List<Event>
) {
    data class Event(
        @JsonProperty("id", required = true)
        val id: String,
        @JsonProperty("type", required = true)
        val type: String,
        @JsonProperty("source", required = true)
        val source: String,
        @JsonProperty("date", required = true)
        val date: String,
        @JsonProperty("title", required = true)
        val title: String,
        @JsonProperty("text", required = true)
        val text: String,
        @JsonProperty("special", required = true)
        val special: Boolean = false,
        @JsonProperty("address")
        val address: Address?,
        @JsonProperty("coordinates")
        val coordinates: Coordinates?,
        @JsonProperty("importance")
        val importance: Double = 1.0,
        @JsonProperty("links", required = false)
        val links: List<String>?
    ) {
        data class Address(
            @JsonProperty("region")
            val region: String?,
            @JsonProperty("place")
            val place: String?,
            @JsonProperty("street")
            val street: String?,
            @JsonProperty("city")
            val building: String?,
        )

        data class Coordinates(
            @JsonProperty("x")
            val x: BigDecimal?,
            @JsonProperty("y")
            val y: BigDecimal?
        )
    }
}