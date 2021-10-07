package com.github.thisisfine.geoapp.model

import org.hibernate.annotations.Type
import org.locationtech.jts.geom.Point
import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "events", schema = "geo_app_schema")
data class Event (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: Long,

    @Column(name = "type", nullable = false)
    val type: String,

    @Column(name = "source", nullable = false)
    val source: String,

    @Column(name = "date")
    val date: Instant,

    @Column(name = "title", nullable = false)
    val title: String,

    @Column(name = "text", nullable = false, length = 1000)
    val text: String,

    @Column(name = "special", nullable = false)
    val special: Boolean = false,

    @Column(name = "x")
    val x: Int?,

    @Column(name = "y")
    val y: Int?,

    @Type(type = "org.hibernate.spatial.JTSGeometryType")
    @Column(name = "geom", columnDefinition = "Geometry")
    val geom: Point?,

    @Column(name = "importance", nullable = false)
    val importance: Int = 1,

    @Column(name = "region")
    val region: String?,

    @Column(name = "city")
    val city: String?,

    //TOD
    @Column(name = "links", length = 1000)
    val links: String?,
)