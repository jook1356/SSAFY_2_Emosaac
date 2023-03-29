package com.emosaac.server.config;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class TesseractOCRConfig {

    @Value("${tesseract.datapath}")
    private String tessdataPath;

    @Value("${tesseract.configs}")
    private List<String> configs;

    @Bean
    public Tesseract tesseract() {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath(tessdataPath);
//        tesseract.setConfigs(configs);
        tesseract.setLanguage("Hangul");

        tesseract.setTessVariable("tessedit_char_blacklist", "®#©《。<+|‘새 이야기0123456789:@=?%ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)>(/_~.«-*——");
        //카카오페이지
//        tesseract.setTessVariable("textord_min_xheight", "38");
//        tesseract.setTessVariable("textord_max_xheight", "40");

        //네이버 시리즈
        tesseract.setTessVariable("textord_min_xheight", "38");
        tesseract.setTessVariable("textord_max_xheight", "40");

        //네이버 웹툰
//        tesseract.setTessVariable("textord_min_xheight", "38");
//        tesseract.setTessVariable("textord_max_xheight", "40");

        tesseract.setTessVariable("user_defined_dpi", "96"); // 인식 대상 이미지의 해상도 설정

        return tesseract;
    }


    public String doOCR(BufferedImage file) throws TesseractException {
        return tesseract().doOCR(file);
    }
}