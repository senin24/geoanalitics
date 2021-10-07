package com.github.thisisfine.geoapp.dto


import com.fasterxml.jackson.annotation.JsonProperty

data class GeocodeResponse(
    @JsonProperty("meta")
    val meta: Meta,
    @JsonProperty("result")
    val result: Result
) {
    data class Meta(
        @JsonProperty("api_version")
        val apiVersion: String,
        @JsonProperty("code")
        val code: Int,
        @JsonProperty("issue_date")
        val issueDate: String
    )

    data class Result(
        @JsonProperty("items")
        val items: List<Item>,
        @JsonProperty("total")
        val total: Int
    ) {
        data class Item(
            @JsonProperty("address_name")
            val addressName: String? = null,
            @JsonProperty("full_name")
            val fullName: String,
            @JsonProperty("id")
            val id: String,
            @JsonProperty("point")
            val point: Point,
            @JsonProperty("purpose_name")
            val purposeName: String? = null,
            @JsonProperty("type")
            val type: String? = null
        ) {
            data class Point(
                @JsonProperty("lat")
                val lat: Double,
                @JsonProperty("lon")
                val lon: Double
            )
        }
    }
}