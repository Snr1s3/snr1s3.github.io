import reflex as rx
from portafolio.components.heading import heading
from portafolio.data import Technology, LearningT
from portafolio.styles.styles import EmSize, Size


def tech_stack(technologies: list[Technology], learnings: list[LearningT]) -> rx.Component:
    return rx.vstack(
        heading("Technologies"),
        rx.flex(
            *[
                rx.badge(
                    rx.box(
                        class_name=technology.icon,
                        font_size="24px"
                    ),
                    rx.text(technology.name),
                    size="2"
                )
                for technology in technologies
            ],
            wrap="wrap",
            spacing=Size.SMALL.value
        ),
        heading("Learning"),
        rx.flex(
            *[
                rx.badge(
                    rx.box(
                        class_name=learning.icon,
                        font_size="24px"
                    ),
                    rx.text(learning.name),
                    size="2"
                )
                for learning in learnings
            ],
            wrap="wrap",
            spacing=Size.SMALL.value
        ),
        spacing=Size.DEFAULT.value
    )
