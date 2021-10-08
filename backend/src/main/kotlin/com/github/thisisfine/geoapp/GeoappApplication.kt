package com.github.thisisfine.geoapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.transaction.annotation.EnableTransactionManagement


@SpringBootApplication
@EnableTransactionManagement
class GeoappApplication {}


fun main(args: Array<String>) {
    runApplication<GeoappApplication>(*args)
}

