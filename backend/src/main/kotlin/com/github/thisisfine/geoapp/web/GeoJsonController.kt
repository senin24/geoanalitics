package com.github.thisisfine.geoapp.web

import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.support.RedirectAttributes


@RestController
@RequestMapping("/api/bank")
class GeoJsonController(
) {

    @GetMapping(value = ["/{path:[^\\.]*}"])
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
//        uploadService.uploadJsontoPostGis(file)
        redirectAttributes.addFlashAttribute(
            "message",
            "You successfully uploaded " + file.originalFilename + "!"
        )
        return "redirect:/"
    }


}