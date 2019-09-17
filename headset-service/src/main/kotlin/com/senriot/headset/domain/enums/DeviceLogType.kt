package com.senriot.headset.domain.enums

enum class DeviceLogStatus
{
    online,
    offline,
    create,
    delete,
    enable,
    disable
}

enum class MessageLogType
{
    Status,
    PropertyPost,
    EventPost,
    Lifecycle,
    Downlink
}
