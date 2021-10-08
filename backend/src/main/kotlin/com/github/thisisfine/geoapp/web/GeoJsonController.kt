package com.github.thisisfine.geoapp.web

import com.github.thisisfine.geoapp.dto.EventsDto
import com.github.thisisfine.geoapp.service.GeoJsonService
import com.github.thisisfine.geoapp.model.UploadService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.SortDefault
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

    @GetMapping("/{id}")
    @Operation(
        summary = "Get Event by code",
        description = "http://localhost:8090/api/event/1"
    )
    fun getEventByCode(@PathVariable(name = "id") id: String): ResponseEntity<Feature> =
        geoJsonService.getEventById(id)
            ?.let { feature -> ResponseEntity.ok(feature) }
            ?: ResponseEntity.notFound().build()

    @PostMapping("/{id}")
    @Operation(summary = "Update Event coordinates")
    fun updateEventCoordinates(@PathVariable(name = "id") id: String,
                               @RequestBody coordinates: CoordinatesDto
    ): ResponseEntity<Feature> =
        geoJsonService.updateEventCoordinates(id, coordinates)
            ?.let { feature -> ResponseEntity.ok(feature) }
            ?: ResponseEntity.notFound().build()

    @GetMapping
    @Operation(summary = "Find all Events by filters")
    fun getAllEventsByParams(
        @RequestParam(name = "type", required = false) type: String?,
        @RequestParam(name = "source", required = false) source: String?,
        @RequestParam(name = "startDate", required = false) startDate: String?,
        @RequestParam(name = "endDate", required = false) endDate: String?,
    ): FeatureCollection =
        geoJsonService.getAllEventsByParams(type, source, startDate, endDate)

    @PostMapping("/saveEventsDtoToDb")
    @Operation(summary = "Save Events Json to DB")
    fun saveEventsDtoToDb(@RequestBody eventsDto: EventsDto) {
        uploadService.saveEventDtoToDb(eventsDto)
    }

    @PostMapping("/saveFileEventsToDb", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
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

    @GetMapping(value = ["/{path:[^\\.]*}"])
    @Operation(hidden = true)
    fun redirect(): String? {
        return "forward:/"
    }
}