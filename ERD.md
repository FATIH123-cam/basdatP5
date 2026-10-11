# Entity Relationship Diagram

This project uses PostgreSQL for data persistence. Below is the ERD diagram for the application.

```mermaid
erDiagram
    users {
        int id PK
        string username UK
        string password_hash
        string role "student or asprak"
        string name
        datetime created_at
    }

    meetings {
        int id PK
        string title
        date date
        string module
        datetime created_at
    }

    attendance {
        int id PK
        int user_id FK
        int meeting_id FK
        string status "pending, submitted, verified, rejected"
        string reason
        datetime created_at
    }

    attendance_photos {
        int id PK
        int attendance_id FK
        string pose
        string photo_url
        datetime created_at
    }

    profiles {
        int id PK
        int user_id FK "Unique"
        string header_theme
        string header_image_url
        datetime created_at
    }

    quiz_attempts {
        int id PK
        int user_id FK
        int meeting_id FK
        int score
        datetime created_at
    }

    erd_diagrams {
        int id PK
        int user_id FK
        string title
        jsonb data
        datetime created_at
    }

    users ||--o{ attendance : "has"
    meetings ||--o{ attendance : "has"
    attendance ||--o{ attendance_photos : "includes"
    users ||--o| profiles : "has one"
    users ||--o{ quiz_attempts : "takes"
    meetings ||--o{ quiz_attempts : "has"
    users ||--o{ erd_diagrams : "creates"
```

## Description
- **users**: Stores authentication and user role data. Both students and aspraks are stored here.
- **meetings**: Stores information about the practicum modules and sessions.
- **attendance**: Links a user to a meeting to record their attendance status.
- **attendance_photos**: Stores the multi-pose photos taken during the photobooth attendance flow.
- **profiles**: Stores customization data for the user's dashboard header.
- **quiz_attempts**: Records scores for quizzes taken by users. (Used for calculating leaderboard standings without needing a dedicated leaderboard table).
- **erd_diagrams**: Stores JSON representations of the ERD designs created in the interactive diagram builder.
