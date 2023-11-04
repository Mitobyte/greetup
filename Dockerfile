FROM rust:1.71.0 as builder

ENV CARGO_INSTALL_ROOT /app

RUN cargo install html-query
RUN cargo install xq

FROM debian:12.2-slim

RUN apt -y update \
    && apt -y install curl \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd appuser \
    && useradd -rm -d /home/appuser -s /bin/bash -g appuser -u 1001 appuser

USER appuser

COPY --from=builder --chown=appuser:appuser /app/bin/hq /usr/local/bin/hq
COPY --from=builder --chown=appuser:appuser /app/bin/xq /usr/local/bin/xq