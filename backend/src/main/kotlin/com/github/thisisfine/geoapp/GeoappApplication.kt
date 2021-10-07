package com.github.thisisfine.geoapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication
class GeoappApplication {}


fun main(args: Array<String>) {
    runApplication<GeoappApplication>(*args)
}

