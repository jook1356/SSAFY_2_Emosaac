# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models




class Book(models.Model):
    book_no = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    story = models.TextField(blank=True, null=True)
    tag = models.TextField(blank=True, null=True)
    plat_cd = models.IntegerField(blank=True, null=True)
    scores = models.FloatField(blank=True, null=True)
    day = models.TextField(blank=True, null=True)
    grade = models.CharField(max_length=255, blank=True, null=True)
    hits = models.IntegerField(blank=True, null=True)
    href = models.CharField(max_length=255, blank=True, null=True)
    regist = models.CharField(max_length=255, blank=True, null=True)
    series = models.CharField(max_length=255, blank=True, null=True)
    thumbnail = models.CharField(max_length=255, blank=True, null=True)
    views = models.CharField(max_length=255, blank=True, null=True)
    genre_cd = models.ForeignKey('Genre', models.DO_NOTHING, db_column='genre_cd', blank=True, null=True)
    type_cd = models.IntegerField(blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'book'




class BookMark(models.Model):
    bookmark_id = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    status = models.TextField(blank=True, null=True)  # This field type is a guess.
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no')
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'book_mark'



class Hit(models.Model):
    hit_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'hit'


class ItemBasedcfmodel(models.Model):
    item_no = models.AutoField(primary_key=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    recommend_book_no_list = models.TextField(blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'item_basedcfmodel'


class ReadBook(models.Model):
    read_no = models.BigAutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'read_book'

class Score(models.Model):
    score_no = models.BigAutoField(primary_key=True)
    score = models.FloatField(blank=True, null=True)
    user_no = models.ForeignKey('User', models.DO_NOTHING, db_column='user_no', blank=True, null=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'score'


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
    gender = models.IntegerField(blank=True, null=True)
    favorite_novel_genre = models.CharField(max_length=255, blank=True, null=True)
    favorite_webtoon_genre = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'user'


class TotalByAgeAndGenderModel(models.Model):
    item_no = models.AutoField(primary_key=True)
    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()
    age = models.IntegerField(blank=True, null=True)
    book_no_list = models.CharField(max_length=255, blank=True, null=True)
    gender = models.IntegerField(blank=True, null=True)
    type_cd = models.IntegerField(blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'total_by_age_gender_model'


class UserBasedCfModel(models.Model):
    item_no = models.AutoField(primary_key=True)
    book_no_list = models.TextField(blank=True, null=True)
    user_no = models.ForeignKey(User, models.DO_NOTHING, db_column='user_no', blank=True, null=True)
    type_cd = models.IntegerField(blank=True, null=True)
    created_dt = models.DateTimeField(blank=True, null=True)
    modified_dt = models.DateTimeField(blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'user_based_cf_model'


class UserPredictedGradeModel(models.Model):
    pred_grade_no = models.AutoField(primary_key=True)
    book_no = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_no', blank=True, null=True)
    user_no = models.ForeignKey(User, models.DO_NOTHING, db_column='user_no', blank=True, null=True)
    pridict_score = models.FloatField(blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가

        managed = False
        db_table = 'user_predicted_grade_model'



class Genre(models.Model):
    genre_cd = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        app_label = 'userbasedcf'  # 추가
        managed = False
        db_table = 'genre'