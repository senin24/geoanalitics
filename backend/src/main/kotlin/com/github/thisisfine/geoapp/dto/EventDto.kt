package com.github.thisisfine.geoapp.dto

import java.math.BigDecimal
import java.time.LocalDate

class EventDto(
    val id: Long,
    val type: String,
    val source: String,
    val date: LocalDate,
    val title: String,
    val text: String,
    val special: Boolean = false,
    val address: Address,
    val coordinates: Coordinates,
    val importance: Long = 1,
    val links: List<Long> = emptyList(),
) {
    data class Address(
        val region: String?,
        val city: String?,
        val house: String?,
        val street: String?
    )

    data class Coordinates(
        val x: BigDecimal? = null,
        val y: BigDecimal? = null
    )
}