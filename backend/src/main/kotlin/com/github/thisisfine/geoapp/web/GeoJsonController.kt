package com.github.thisisfine.geoapp.web

import com.github.thisisfine.geoapp.dto.EventsDto
import com.github.thisisfine.geoapp.service.GeoJsonService
import com.github.thisisfine.geoapp.model.UploadService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.support.RedirectAttributes


@RestController
@RequestMapping("/api/event")
class GeoJsonController(
    private val geoJsonService: GeoJsonService,
    private val uploadService: UploadService
) {

    @GetMapping(value = ["/{path:[^\\.]*}"])
    @Operation(hidden = true)
    fun redirect(): String? {
        return "forward:/"
    }

    @PostMapping("/", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @Operation(
        summary = "Upload file"
    )
    fun handleFileUpload(
        @RequestParam("file") file: MultipartFile,
        redirectAttributes: RedirectAttributes
    ): String {
        println("File upload: ${file.originalFilename}")
        uploadService.uploadEvents(file)
        redirectAttributes.addFlashAttribute(
            "message",
            "You successfully uploaded " + file.originalFilename + "!"
        )
        return "redirect:/"
    }

    @GetMapping
    @Operation(summary = "Get all Events")
    fun getAllEvents(): FeatureCollection = geoJsonService.getAllEvents()

    @GetMapping("/{id}")
    @Operation(
        summary = "Get Event by code",
        description = "http://localhost:8090/api/event/1"
    )
    fun getEventByCode(@PathVariable(name = "id") id: String): ResponseEntity<Feature> =
        geoJsonService.getEventById(id)
            ?.let { feature -> ResponseEntity.ok(feature) }
            ?: ResponseEntity.notFound().build()

    @GetMapping("/filterByType", params = ["type"])
    @Operation(summary = "Get Events by Type", tags = ["filters"])
    fun getEventsByType(type: String): FeatureCollection =
        geoJsonService.getEventsByType(type)

    @GetMapping("/filterBySource", params = ["source"])
    @Operation(summary = "Get Events by Source", tags = ["filters"])
    fun getEventsBySource(source: String): FeatureCollection =
        geoJsonService.getEventsBySource(source)

    @GetMapping("/filterByTypeAndSource", params = ["type", "source"])
    @Operation(summary = "Get Events by Type an Source", tags = ["filters"])
    fun getEventsByTypeAndSource(type: String, source: String): FeatureCollection =
        geoJsonService.getEventsByTypeAndSource(type, source)

    @PostMapping
    @Operation(summary = "Save Rx Json to db")
    fun saveRxEventsDtoToDb(@RequestBody eventsDto: EventsDto){
        uploadService.saveEventDtoToDb(eventsDto)
    }
}