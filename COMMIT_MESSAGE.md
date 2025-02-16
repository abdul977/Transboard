fix(transcription): improve audio transcription with Groq API

- Update transcription service to properly handle file uploads
- Add detailed error logging for API requests
- Fix model configuration and endpoint settings
- Add support for verbose_json response format
- Increase request timeouts and size limits
- Add comprehensive error handling and debug logging

This change fixes the overlay transcription functionality by properly
configuring the Groq API integration and improving error handling.
The changes should resolve issues with transcription not working
and provide better visibility into any API errors.
