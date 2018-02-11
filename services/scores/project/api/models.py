# services/scores/project/api/models.py


from project import db


class Score(db.Model):
    __tablename__ = 'scores'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    exercise_id = db.Column(db.Integer, nullable=False)
    correct = db.Column(db.Boolean, nullable=True)

    def __init__(self, user_id, exercise_id, correct=None):
        self.user_id = user_id
        self.exercise_id = exercise_id
        self.correct = correct

    def to_json(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'exercise_id': self.exercise_id,
            'correct': self.correct
        }
