export declare enum HTTPVerbs {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT",
    TRACE = "TRACE",
    COPY = "COPY",
    LINK = "LINK",
    UNLINK = "UNLINK",
    PURGE = "PURGE",
    LOCK = "LOCK",
    UNLOCK = "UNLOCK",
    PROPFIND = "PROPFIND",
    VIEW = "VIEW",
    ALL = "*"
}
export declare enum StatusCodes {
    ACCEPTED = 202,
    ALREADY_REPORTED = 208,
    BAD_GATEWAY = 502,
    BAD_REQUEST = 400,
    BANDWIDTH_LIMIT_EXCEEDED = 509,
    CONFLICT = 409,
    CONTINUE = 100,
    CREATED = 201,
    EXPECTATION_FAILED = 417,
    FAILED_DEPENDENCY = 424,
    FORBIDDEN = 403,
    FOUND = 302,
    GATEWAY_TIMEOUT = 504,
    GONE = 410,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    IM_A_TEAPOT = 418,
    IM_USED = 226,
    INSUFFICIENT_STORAGE = 507,
    INTERNAL_SERVER_ERROR = 500,
    LENGTH_REQUIRED = 411,
    LOCKED = 423,
    LOOP_DETECTED = 508,
    METHOD_NOT_ALLOWED = 405,
    MISDIRECTED_REQUEST = 421,
    MOVED_PERMANENTLY = 301,
    MULTIPLE_CHOICES = 300,
    MULTI_STATUS = 207,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NOT_ACCEPTABLE = 406,
    NOT_EXTENDED = 510,
    NOT_FOUND = 404,
    NOT_IMPLEMENTED = 501,
    NOT_MODIFIED = 304,
    NO_CONTENT = 204,
    OK = 200,
    PARTIAL_CONTENT = 206,
    PAYLOAD_TOO_LARGE = 413,
    PAYMENT_REQUIRED = 402,
    PERMANENT_REDIRECT = 308,
    PRECONDITION_FAILED = 412,
    PRECONDITION_REQUIRED = 428,
    PROCESSING = 102,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    RANGE_NOT_SATISFIABLE = 416,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    REQUEST_TIMEOUT = 408,
    RESET_CONTENT = 205,
    SEE_OTHER = 303,
    SERVICE_UNAVAILABLE = 503,
    SWITCHING_PROTOCOLS = 101,
    TEMPORARY_REDIRECT = 307,
    TOO_MANY_REQUESTS = 429,
    UNAUTHORIZED = 401,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    UNORDERED_COLLECTION = 425,
    UNPROCESSABLE_ENTITY = 422,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UPGRADE_REQUIRED = 426,
    URI_TOO_LONG = 414,
    USE_PROXY = 305,
    VARIANT_ALSO_NEGOTIATES = 506
}
export declare const StatusCodesText: {
    202: string;
    208: string;
    502: string;
    400: string;
    509: string;
    409: string;
    100: string;
    201: string;
    417: string;
    424: string;
    403: string;
    302: string;
    504: string;
    410: string;
    505: string;
    418: string;
    226: string;
    507: string;
    500: string;
    411: string;
    423: string;
    508: string;
    405: string;
    421: string;
    301: string;
    300: string;
    207: string;
    511: string;
    203: string;
    406: string;
    510: string;
    404: string;
    501: string;
    304: string;
    204: string;
    200: string;
    206: string;
    413: string;
    402: string;
    308: string;
    412: string;
    428: string;
    102: string;
    407: string;
    416: string;
    431: string;
    408: string;
    205: string;
    303: string;
    503: string;
    101: string;
    307: string;
    429: string;
    401: string;
    451: string;
    425: string;
    422: string;
    415: string;
    426: string;
    414: string;
    305: string;
    506: string;
};
export declare enum ContentTypes {
    APPLICATION_JSON = "application/json",
    APPLICATION_XML = "application/xml",
    APPLICATION_FORM_URLENCODED = "application/x-www-form-urlencoded",
    APPLICATION_OCTET_STREAM = "application/octet-stream",
    TEXT_HTML = "text/html",
    TEXT_PLAIN = "text/plain",
    TEXT_CSS = "text/css",
    TEXT_JAVASCRIPT = "text/javascript",
    TEXT_XML = "text/xml",
    IMAGE_GIF = "image/gif",
    IMAGE_JPEG = "image/jpeg",
    IMAGE_PNG = "image/png",
    IMAGE_SVG = "image/svg+xml",
    IMAGE_WEBP = "image/webp",
    IMAGE_ICO = "image/x-icon",
    AUDIO_MP4 = "audio/mp4",
    AUDIO_MP3 = "audio/mpeg",
    AUDIO_OGG = "audio/ogg",
    AUDIO_WEBM = "audio/webm",
    VIDEO_MP4 = "video/mp4",
    VIDEO_WEBM = "video/webm",
    VIDEO_OGG = "video/ogg",
    VIDEO_MPEG = "video/mpeg",
    VIDEO_QUICKTIME = "video/quicktime",
    VIDEO_X_MS_WMV = "video/x-ms-wmv",
    VIDEO_X_MS_ASF = "video/x-ms-asf"
}
export declare enum HTTPHeaders {
    ACCEPT = "accept",
    ACCEPT_LANGUAGE = "accept-language",
    ACCEPT_PATCH = "accept-patch",
    ACCEPT_RANGES = "accept-ranges",
    ACCESS_CONTROL_ALLOW_CREDENTIALS = "access-control-allow-credentials",
    ACCESS_CONTROL_ALLOW_HEADERS = "access-control-allow-headers",
    ACCESS_CONTROL_ALLOW_METHODS = "access-control-allow-methods",
    ACCESS_CONTROL_ALLOW_ORIGIN = "access-control-allow-origin",
    ACCESS_CONTROL_EXPOSE_HEADERS = "access-control-expose-headers",
    ACCESS_CONTROL_MAX_AGE = "access-control-max-age",
    ACCESS_CONTROL_REQUEST_HEADERS = "access-control-request-headers",
    ACCESS_CONTROL_REQUEST_METHOD = "access-control-request-method",
    AGE = "age",
    ALLOW = "allow",
    ALT_SVC = "alt-svc",
    AUTHORIZATION = "authorization",
    CACHE_CONTROL = "cache-control",
    CONNECTION = "connection",
    CONTENT_DISPOSITION = "content-disposition",
    CONTENT_ENCODING = "content-encoding",
    CONTENT_LANGUAGE = "content-language",
    CONTENT_LENGTH = "content-length",
    CONTENT_LOCATION = "content-location",
    CONTENT_RANGE = "content-range",
    CONTENT_TYPE = "content-type",
    COOKIE = "cookie",
    DATE = "date",
    ETAG = "etag",
    EXPECT = "expect",
    EXPIRES = "expires",
    FORWARDED = "forwarded",
    FROM = "from",
    HOST = "host",
    IF_MATCH = "if-match",
    IF_MODIFIED_SINCE = "if-modified-since",
    IF_NONE_MATCH = "if-none-match",
    IF_UNMODIFIED_SINCE = "if-unmodified-since",
    LAST_MODIFIED = "last-modified",
    LOCATION = "location",
    ORIGIN = "origin",
    PRAGMA = "pragma",
    PROXY_AUTHENTICATE = "proxy-authenticate",
    PROXY_AUTHORIZATION = "proxy-authorization",
    PUBLIC_KEY_PINS = "public-key-pins",
    RANGE = "range",
    REFERRER = "referer",
    RETRY_AFTER = "retry-after",
    SEC_WEB_SOCKET_ACCEPT = "sec-websocket-accept",
    SEC_WEB_SOCKET_EXTENSIONS = "sec-websocket-extensions",
    SEC_WEB_SOCKET_KEY = "sec-websocket-key",
    SEC_WEB_SOCKET_PROTOCOL = "sec-websocket-protocol",
    SEC_WEB_SOCKET_VERSION = "sec-websocket-version",
    SET_COOKIE = "set-cookie",
    STRICT_TRANSPORT_SECURITY = "strict-transport-security",
    TK = "tk",
    TRAILER = "trailer",
    TRANSFER_ENCODING = "transfer-encoding",
    UPGRADE = "upgrade",
    USER_AGENT = "user-agent",
    VARY = "vary",
    VIA = "via",
    WARNING = "warning",
    WWW_AUTHENTICATE = "www-authenticate"
}
export declare enum Module {
    HTTP = "http",
    HTTPS = "https"
}
