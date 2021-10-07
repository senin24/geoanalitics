package com.github.thisisfine.geoapp.dto


import com.fasterxml.jackson.annotation.JsonProperty

//TODO Андрей,  укажи какие поля нулабельны
data class EventsDto(
    @JsonProperty("events")
    val events: List<Event>
) {
    data class Event(
        @JsonProperty("id")
        val id: Int,
        @JsonProperty("type")
        val type: String,
        @JsonProperty("source")
        val source: String,
        @JsonProperty("date")
        val date: String,
        @JsonProperty("title")
        val title: String,
        @JsonProperty("text")
        val text: String,
        @JsonProperty("special")
        val special: Boolean = false,
        @JsonProperty("address")
        val address: Address,
        @JsonProperty("coordinates")
        val coordinates: Coordinates,
        @JsonProperty("importance")
        val importance: Int = 1,
        @JsonProperty("links")
        val links: List<Int>
    ) {
        data class Address(
            @JsonProperty("region")
            val region: String,
            @JsonProperty("city")
            val city: String
        )

        data class Coordinates(
            @JsonProperty("x")
            val x: Int,
            @JsonProperty("y")
            val y: Int
        )
    }
}