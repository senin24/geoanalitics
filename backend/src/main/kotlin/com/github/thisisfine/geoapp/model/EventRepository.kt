package com.github.thisisfine.geoapp.model;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface EventRepository : JpaRepository<Event, String>, JpaSpecificationExecutor<Event> {

    fun findAllByType(type: String): List<Event>

    fun findAllBySource(source: String): List<Event>

    fun findAllByTypeAndSource(type: String, source: String): List<Event>
}