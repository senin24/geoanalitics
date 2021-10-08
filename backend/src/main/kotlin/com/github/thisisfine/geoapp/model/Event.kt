package com.github.thisisfine.geoapp.model

import org.hibernate.annotations.Type
import org.locationtech.jts.geom.Point
import java.math.BigDecimal
import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "events", schema = "geo_app_schema")
data class Event (
    @Id
    @Column(name = "id", nullable = false)
    val id: String,

    @Column(name = "type", nullable = false, length = 255)
    val type: String,

    @Column(name = "source", nullable = false, length = 255)
    val source: String,

    @Column(name = "date")
    val date: Instant,

    @Column(name = "title", nullable = false, length = 255)
    val title: String,

    @Column(name = "text", nullable = false, length = 10000)
    val text: String,

    @Column(name = "special", nullable = false)
    val special: Boolean = false,

    @Column(name = "x")
    val x: BigDecimal?,

    @Column(name = "y")
    val y: BigDecimal?,

    @Type(type = "org.locationtech.jts.geom.Point")
    @Column(name = "geom", columnDefinition = "Geometry")
    val geom: Point?,

    @Column(name = "importance", nullable = false)
    val importance: BigDecimal = BigDecimal.ONE,

    @Column(name = "region", length = 255)
    val region: String?,

    @Column(name = "place", length = 255)
    val place: String?,

    @Column(name = "street", length = 255)
    val street: String?,

    @Column(name = "building", length = 255)
    val building: String?,

    @Column(name = "links", length = 1000)
    @Convert(converter = SetConverter::class)
    val links: Set<String>?,
)