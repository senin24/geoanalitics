package com.github.thisisfine.geoapp.web

import java.math.BigDecimal

data class FeatureCollection (
    val type: String = "FeatureCollection",
    val features: List<Feature>
        )
data class Feature(
    val type: String = "Feature",
    val geometry: Geometry,
    val properties: Property
) {
    data class Geometry(
        val type: String = "Point",
        // longitude, latitude
        val coordinates: Array<BigDecimal?> = emptyArray()
    ) {
        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false

            other as Geometry

            if (type != other.type) return false
            if (!coordinates.contentEquals(other.coordinates)) return false

            return true
        }

        override fun hashCode(): Int {
            var result = type.hashCode()
            result = 31 * result + coordinates.contentHashCode()
            return result
        }
    }

    data class Property(
        val id: String,
        val type: String,
        val source: String,
        val date: String,
        val title: String,
        val text: String,
        val special: Boolean = false,
        val address: Address?,
        val coordinates: Coordinates?,
        val importance: BigDecimal = BigDecimal.ONE,
        val links: List<String>?
    ){

        data class Address (
            val region: String?,
            val place: String?,
            val street: String?,
            val building: String?,
        )

        data class Coordinates(
            val x: BigDecimal?,
            val y: BigDecimal?
        )
    }
}