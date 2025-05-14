package com.jicay.bookmanagement.infrastructure.driving.web

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class FrontendController {
    @RequestMapping(
        value = [
            "/{path:^(?!api|static|index\\.html$).*$}",
            "/{path:^(?!api|static|index\\.html$).*$}/**"
        ]
    )
    fun redirect(): String {
        return "forward:/index.html"
    }
}