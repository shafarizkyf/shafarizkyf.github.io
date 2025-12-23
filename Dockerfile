FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy website files
COPY html/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
