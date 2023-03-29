package com.emosaac.server.service;


import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.io.File;

public class ImagePreprocessing {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    public static void ImagePreprocessing(File file) {
        // 이미지 파일 읽기
        Mat image = Imgcodecs.imread("input.jpg");

        // 이미지 전처리 - 흑백 변환
        Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY);

        // 이미지 전처리 - 이진화 처리
        Imgproc.threshold(image, image, 0, 255, Imgproc.THRESH_BINARY | Imgproc.THRESH_OTSU);

        // 이미지 전처리 - 블러 처리
        Imgproc.GaussianBlur(image, image, new Size(3, 3), 0);

        // 결과 이미지 파일 저장
        Imgcodecs.imwrite("output.jpg", image);
    }
}
