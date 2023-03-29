package com.emosaac.server.service;

import com.emosaac.server.domain.user.User;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OcrService_old {

    private final CommonService commonService;

    public String recognize(
            BufferedImage file) throws IOException {

        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata"); //로컬
//        tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata"); //배포

        String result = "";
        tesseract.setLanguage("Hangul");

        tesseract.setTessVariable("user_defined_dpi", "96"); // 인식 대상 이미지의 해상도 설정
        try {
            result = tesseract.doOCR(file);
            System.out.println(result);
        } catch (TesseractException e) {
            System.err.println(e.getMessage());
        }

        return result;

    }

    public String postFile(Long userId, MultipartFile multipartFile) throws IOException {
        User user = commonService.getUser(userId);
        //multipartFile -> File
        // MultipartFile 객체에서 InputStream 얻기
        InputStream inputStream = multipartFile.getInputStream();
        String str = recognize(ImageIO.read(inputStream));
        inputStream.close();
        return str;
    }
}
