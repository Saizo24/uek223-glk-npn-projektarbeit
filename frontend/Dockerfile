FROM node:14-alpine
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 8001
# Start the app
CMD [ "yarn", "start" ]