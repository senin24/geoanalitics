package com.github.thisisfine.geoapp.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.github.thisisfine.geoapp.dto.GeocodeRequestParams
import com.github.thisisfine.geoapp.dto.GeocodeResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpRequest
import org.springframework.http.client.ClientHttpRequestExecution
import org.springframework.http.client.ClientHttpRequestInterceptor
import org.springframework.stereotype.Component
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder
import java.io.IOException
import java.net.URI
import java.time.Duration
import kotlin.reflect.full.memberProperties

@Component
class GisClient(
    @Value("\${app.key2Gis}")
    private val key2Gis: String,
    private val restTemplateBuilder: RestTemplateBuilder
) {

    companion object {
        private val objectMapper = ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .registerModules(KotlinModule())
    }

    val host = "catalog.api.2gis.com"
    val geocodePath = "3.0/items/geocode"
    val restTemplate: RestTemplate = restTemplateBuilder
        .additionalInterceptors(ClientHttpRequestInterceptor { request: HttpRequest, body: ByteArray?, execution: ClientHttpRequestExecution ->
            request.headers.add(
                "user-agent",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
            )
            execution.execute(request, body!!)
        })
        .setConnectTimeout(Duration.ofSeconds(5))
        .setReadTimeout(Duration.ofSeconds(30)).build()

    fun getGeocodedAddress(geoCodeParam: GeocodeRequestParams): GeocodeResponse? {
        Thread.sleep(200) //Max 10 TPS!!!
        val uri: URI = getResourceUrl(geoCodeParam)
        val respEntity = try {
            restTemplate.getForEntity(uri, String::class.java)
        } catch (ex: RestClientException) {
            return null
        }
        if (!respEntity.statusCode.is2xxSuccessful) {
            return null
        }
        return try {
            objectMapper.readValue(respEntity.body, GeocodeResponse::class.java)
        } catch (ex: IOException) {
            return null
        }
    }

    private fun getResourceUrl(geoCodeParam: GeocodeRequestParams): URI {
        val builder = UriComponentsBuilder.newInstance()
            .scheme("https")
            .host(host)
            .path(geocodePath)
        geoCodeParam::class.memberProperties.forEach {
            builder.queryParam(
                it.name,
                it.getter.call(geoCodeParam) as String
            )
        }
        builder.queryParam("key", key2Gis)
        return builder.build().encode().toUri()
    }

}