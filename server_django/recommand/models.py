# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `d = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models



class UserBasedCFModel(models.Model):
    item_no = models.IntegerField(primary_key=True)
    book_no = models.ForeignKey('Book', models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'user_basedcfmodel'


class BestBook30Model(models.Model):
    best_no = models.IntegerField(primary_key=True)
    book_no = models.ForeignKey('Book', models.DO_NOTHING, db_column='book_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand' # 추가
        managed = False
        db_table = 'best_book30model'


class Book(models.Model):
    book_no = models.BigAutoField(primary_key=True)
    score = models.FloatField(blank=True, null=True)
    day = models.TextField(blank=True, null=True)
    grade = models.CharField(max_length=255, blank=True, null=True)
    hit = models.IntegerField(blank=True, null=True)
    href = models.CharField(max_length=255, blank=True, null=True)
    plat_cd = models.IntegerField(blank=True, null=True)
    regist = models.CharField(max_length=255, blank=True, null=True)
    series = models.CharField(max_length=255, blank=True, null=True)
    story = models.TextField(blank=True, null=True)
    thumbnail = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    type_cd = models.IntegerField(blank=True, null=True)
    views = models.CharField(max_length=255, blank=True, null=True)
    genre_cd = models.ForeignKey('Genre', models.DO_NOTHING, db_column='genre_cd', blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    tag = models.TextField(blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'book'


class BookComment(models.Model):
    detail_comment_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    content = models.TextField(blank=True, null=True)
    depth = models.IntegerField(blank=True, null=True)
    is_delete = models.TextField(blank=True, null=True)  # This field type is a guess.
    book = models.ForeignKey(Book, models.DO_NOTHING, blank=True, null=True)
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)
    like_score = models.FloatField(blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'book_comment'


class BookCommentLike(models.Model):
    comment_like_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    like_status = models.TextField(blank=True, null=True)  # This field type is a guess.
    book_comment_no = models.ForeignKey(BookComment, models.DO_NOTHING, db_column='book_comment_no')
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'book_comment_like'


class BookMark(models.Model):
    bookmark_id = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    status = models.TextField(blank=True, null=True)  # This field type is a guess.
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no')
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'book_mark'


class DayNovel(models.Model):
    day_novel_cd = models.BigAutoField(primary_key=True)
    book_no_list = models.TextField(blank=True, null=True)
    day_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'day_novel'


class DayToon(models.Model):
    day_toon_cd = models.BigAutoField(primary_key=True)
    book_no_list = models.TextField(blank=True, null=True)
    day_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'day_toon'


class EmoCommentLike(models.Model):
    comment_like_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    like_status = models.TextField(blank=True, null=True)  # This field type is a guess.
    emo_comment_no = models.ForeignKey('EmopickComment', models.DO_NOTHING, db_column='emo_comment_no')
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'emo_comment_like'


class Emopick(models.Model):
    emopick_no = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    contents_list = models.JSONField(blank=True, null=True)
    webtoon_seq = models.CharField(max_length=255, blank=True, null=True)
    novel_seq = models.CharField(max_length=255, blank=True, null=True)
    book_seq = models.CharField(max_length=255, blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'emopick'


class EmopickComment(models.Model):
    emo_comment_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    content = models.TextField(blank=True, null=True)
    depth = models.IntegerField(blank=True, null=True)
    is_delete = models.TextField(blank=True, null=True)  # This field type is a guess.
    emopick_no = models.ForeignKey(Emopick, models.DO_NOTHING, db_column='emopick_no', blank=True, null=True)
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'emopick_comment'


class Genre(models.Model):
    genre_cd = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'genre'


class Hit(models.Model):
    hit_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'hit'


class ItemBasedcfmodel(models.Model):
    item_no = models.AutoField(primary_key=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'item_basedcfmodel'


class LikeEmo(models.Model):
    like_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    emopick_no = models.ForeignKey(Emopick, models.DO_NOTHING, db_column='emopick_no', blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'like_emo'


class ReadBook(models.Model):
    read_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'read_book'


class Research(models.Model):
    research_no = models.BigAutoField(primary_key=True)
    book_id = models.BigIntegerField(blank=True, null=True)
    gerne_id = models.BigIntegerField(blank=True, null=True)
    type = models.BigIntegerField(blank=True, null=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'research'


class Score(models.Model):
    score_no = models.BigAutoField(primary_key=True)
    score = models.FloatField(blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'score'


class TagNovel(models.Model):
    tag_cd = models.BigAutoField(primary_key=True)
    book_no_list = models.TextField(blank=True, null=True)
    tag_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'tag_novel'


class TagToon(models.Model):
    tag_cd = models.BigAutoField(primary_key=True)
    book_no_list = models.TextField(blank=True, null=True)
    tag_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'tag_toon'


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    email = models.CharField(max_length=512, blank=True, null=True)
    image_url = models.CharField(max_length=512, blank=True, null=True)
    nick_name = models.CharField(unique=True, max_length=100, blank=True, null=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    provider_type = models.CharField(max_length=20, blank=True, null=True)
    provider_id = models.CharField(max_length=255, blank=True, null=True)
    user_name = models.CharField(max_length=100, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)  # This field type is a guess.
    favorite_novel_genre = models.CharField(max_length=255, blank=True, null=True)
    favorite_webtoon_genre = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'user'


class UserPredictedGradeModel(models.Model):
    pred_grade_no = models.AutoField(primary_key=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey(User, models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'recommand'  # 추가
        managed = False
        db_table = 'user_predicted_grade_model'


# class UserRefreshToken(models.Model):
#     refresh_token_no = models.BigAutoField(primary_key=True)
#     refresh_token = models.CharField(max_length=256)
#     user_id = models.CharField(unique=True, max_length=64)
#
#     class Meta:
#         app_label = 'recommand'  # 추가
#         managed = False
#         db_table = 'user_refresh_token'
