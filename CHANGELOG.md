# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-27

### Added
- Dual Mode support (CommonJS and ES Modules).
- Automatic retries with exponential backoff for network and 5xx errors.
- Unified `ShipmozoError` class for predictable error handling.
- Enhanced TypeScript definitions (removed `any` usage).
- Configuration validation on initialization.
- Unit tests with 100% method coverage.

### Fixed
- Fixed build process to exclude test files from distribution.
- Improved cross-platform compatibility for build scripts.

## [1.0.0] - 2025-12-27

### Added
- Initial release of Shipmozo Node.js SDK.
- Support for all 17 Shipmozo API endpoints.
- Support for Multi-Piece Shipments (MPS).
- Custom `ShipmozoError` class for better error handling.
- Integrated automatic retries with exponential backoff for network/5xx errors.
- Configuration validation on client initialization.
- Type definitions for all payloads and responses.
