package com.github.thisisfine.geoapp.model;

import org.springframework.data.jpa.repository.JpaRepository

interface EventRepository : JpaRepository<Event, String> {
}