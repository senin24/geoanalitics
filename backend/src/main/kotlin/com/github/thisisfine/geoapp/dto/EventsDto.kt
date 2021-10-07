package com.github.thisisfine.geoapp.dto


import com.fasterxml.jackson.annotation.JsonProperty

//TODO Андрей,  укажи какие поля нулабельны
data class EventsDto(
    @JsonProperty("events")
    val events: List<Event>
) {
    data class Event(
        @JsonProperty("id", required = true)
        val id: Int,
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
        @JsonProperty("address", required = false)
        val address: Address?,
        @JsonProperty("coordinates", required = false)
        val coordinates: Coordinates?,
        @JsonProperty("importance", required = true)
        val importance: Int = 1,
        @JsonProperty("links", required = false)
        val links: List<Int>?
    ) {
        data class Address(
            @JsonProperty("region", required = false)
            val region: String?,
            @JsonProperty("place", required = true)
            val palce: String,
            @JsonProperty("street", required = false)
            val street: String?,
            @JsonProperty("city", required = false)
            val building: String?,
        )

        data class Coordinates(
            @JsonProperty("x")
            val x: Int,
            @JsonProperty("y")
            val y: Int
        )
    }
}