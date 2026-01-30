import reflex as rx
from portafolio.data import Extra

from portafolio.styles.styles import IMAGE_HEIGHT, Size


def card_detail(extra: Extra) -> rx.Component:
    return rx.card(
        rx.link(
            rx.inset(
                rx.image(
                    src=extra["image"],
                    height="25%",
                    width="25%",
                    object_fit="contain"
                ),
                pb=Size.DEFAULT.value
            ),
            rx.text.strong(extra["title"]),
            rx.text(
                extra["description"],
                size=Size.SMALL.value,
                color_scheme="gray"
            )
        ),
        width="100%",
        href=extra["url"],
        is_external=True
    )
