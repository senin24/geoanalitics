package com.github.thisisfine.geoapp.dto

data class GeocodeRequestParams(
    val q: String, //Address
    val fields: String = "items.point"
)