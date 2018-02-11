# services/scores/project/tests/utils.py


from project import db
from project.api.models import Score


def add_score(user_id, exercise_id, correct):
    score = Score(
        user_id=user_id,
        exercise_id=exercise_id,
        correct=correct
    )
    db.session.add(score)
    db.session.commit()
    return score
