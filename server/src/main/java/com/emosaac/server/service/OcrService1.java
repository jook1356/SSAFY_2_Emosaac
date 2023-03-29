package com.emosaac.server.service;

import boofcv.alg.filter.blur.GBlurImageOps;
import com.emosaac.server.config.TesseractOCRConfig;
import com.emosaac.server.domain.user.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ij.plugin.filter.GaussianBlur;
import ij.plugin.filter.PlugInFilterRunner;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.color.ColorSpace;
import java.awt.image.*;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OcrService1 {

    private final CommonService commonService;
    private final TesseractOCRConfig tesseractOCRConfig;
    public String recognize(BufferedImage file) throws IOException {

//        Tesseract tesseract = new Tesseract();
//        tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata"); //로컬
        // tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata"); //배포
//        tesseract.setTessVariable("user_defined_dpi", "96"); // 인식 대상 이미지의 해상도 설정


        String result = "";

        try {
            result = tesseractOCRConfig.doOCR(file);
//            tesseract.doOCR(file);
            System.out.println(result);
        } catch (TesseractException e) {
            System.err.println(e.getMessage());
        }

        return result;
    }

    public String postFile(Long userId, MultipartFile multipartFile) throws IOException {
        User user = commonService.getUser(userId);

        // MultipartFile -> File로 변환
        // MultipartFile 객체에서 InputStream 얻기
        InputStream inputStream = multipartFile.getInputStream();

        // InputStream을 BufferedInputStream으로 감싸기
        BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);

        // BufferedImage로 변환
        BufferedImage bufferedImage = ImageIO.read(bufferedInputStream);

        // 이미지 전처리
        BufferedImage processedImage = preprocessImage(bufferedImage);

         // OCR 처리
        String str = recognize(processedImage);
//        String str = recognize(bufferedImage);

        // 사용 후 스트림 닫기
        bufferedInputStream.close();
        inputStream.close();

        return str;
    }


    public BufferedImage preprocessImage(BufferedImage image) {
        // 이미지를 흑백으로 변환
        BufferedImage grayImage = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D graphics = grayImage.createGraphics();
        graphics.drawImage(image, 0, 0, null);
        graphics.dispose();

        // 가우시안 필터 적용
        float[] matrix = {
                1/16f, 1/8f, 1/16f,
                1/8f, 1/4f, 1/8f,
                1/16f, 1/8f, 1/16f
        };
        Kernel kernel = new Kernel(3, 3, matrix);
        ConvolveOp convolve = new ConvolveOp(kernel);
        BufferedImage filteredImage = convolve.filter(grayImage, null);

        // 노이즈 제거
        BufferedImageOp op = new ColorConvertOp(ColorSpace.getInstance(ColorSpace.CS_GRAY), null);
        BufferedImage gray = op.filter(filteredImage, null);
        BufferedImage denoisedImage = new BufferedImage(gray.getWidth(), gray.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g = denoisedImage.createGraphics();
        g.drawImage(gray, 0, 0, null);
        g.dispose();

        return denoisedImage;
    }


//    public BufferedImage preprocessImage(BufferedImage image) {
//        // 이미지를 흑백으로 변환
//        BufferedImage grayImage = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
//        Graphics2D graphics = grayImage.createGraphics();
//        graphics.drawImage(image, 0, 0, null);
//        graphics.dispose();
//
//        // 미디언 필터 적용
//        BufferedImage medianImage = new BufferedImage(grayImage.getWidth(), grayImage.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
//        MedianFilterOp medianFilter = new MedianFilterOp(3);
//        medianFilter.filter(grayImage, medianImage);
//
//        return medianImage;
//    }

}
