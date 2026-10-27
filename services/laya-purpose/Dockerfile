ARG PYTHON_IMAGE
FROM ${PYTHON_IMAGE}
WORKDIR /app
COPY requirements.lock .
RUN pip install --no-cache-dir --require-hashes --only-binary=:all: --extra-index-url https://download.pytorch.org/whl/cpu -r requirements.lock \
    && useradd --uid 10001 --create-home app
COPY app.py questions.json ./
ENV HF_HOME=/models HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1 HF_HUB_DISABLE_TELEMETRY=1 LAYA_DEVICE=cpu
USER 10001
EXPOSE 8011
HEALTHCHECK --start-period=120s --interval=30s --timeout=5s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8011/healthz', timeout=3)"
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8011", "--workers", "1", "--no-access-log", "--no-proxy-headers", "--limit-concurrency", "16", "--timeout-keep-alive", "5"]
