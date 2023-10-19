# Use the Alpine Linux base image with Python 3.10
FROM python:3.10-alpine

# Install needed packages for the ODBC SCRIPT
RUN set -ex && apk --no-cache add sudo
RUN apk --no-cache add curl
RUN apk update \
    && apk fetch gnupg \
    && apk add gnupg \
    && gpg --list-keys

# Add the installation script and execute it
ADD install_msodbc.sh /app/
RUN chmod +x /app/install_msodbc.sh
RUN /app/install_msodbc.sh

# Install development dependencies required for building Python packages with C/C++ code
RUN apk add --no-cache build-base unixodbc-dev

# Install the pyodbc Python package
RUN pip install pyodbc

# Copy and run your Python script
COPY connect.py /app/
CMD ["python", "/app/connect.py"]