package com.github.thisisfine.geoapp.model

import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter
class SetConverter : AttributeConverter<Set<String>, String> {
    override fun convertToDatabaseColumn(attribute: Set<String>?): String? =
        attribute?.let { it.joinToString(separator = ";") }

    override fun convertToEntityAttribute(dbData: String?): Set<String>? =
        dbData?.let {it.split(";")}?.toSet()
}