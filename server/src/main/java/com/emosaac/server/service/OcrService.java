package com.emosaac.server.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.AnnotateImageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.springframework.web.multipart.MultipartFile;
import com.google.protobuf.ByteString;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OcrService {


    private final CommonService commonService;


    public static String detectTextGcs(MultipartFile file) throws IOException {

        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString byteString = ByteString.copyFrom(file.getBytes());
        Image image = Image.newBuilder().setContent(byteString).build();

        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(image).build();
        requests.add(request);

        String credentialPath = "src/main/resources/woven-name-382111-f4f2ed422bd9.json";
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialPath));

        // Set the ImageAnnotatorSettings with the credentials
        ImageAnnotatorSettings settings =
                ImageAnnotatorSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build();

        StringBuilder sb = new StringBuilder();
        String strRes="";

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create(settings)) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();
            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return null;
                }

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {

                    System.out.println("--------");
                    strRes = annotation.getDescription().substring(68, annotation.getDescription().length());
                    System.out.println(strRes);
                    System.out.println("---------------");

                    String str = annotation.getDescription().replaceAll("[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]", " ");
                    str = str.substring(70, str.length());

                    String[] strList = {"대여","소장","관심","NEW", "다운로드", "관심웹툰","전체", "지금", "볼", "최근",
                            "본", "MY", "TALK", "새 이야기", "UP" ,"더보기" ,"이어보기" ,"월", "화","수","목","금","토","일","매일","연재중","완결", "보관함", "최근", "좋아요", "구매 작품", "다운로드",
                    "대여", "소장", "책갈피", "다운로드","편집", "전체","업데이트 순", "임시저장","댓글","내 쿠키", "voice r","voice"};
                    for(String tmp: strList){
                        str.replaceAll(tmp, "");
                    }

                    sb.append(str).append("\n");
                    break;
//                    System.out.format("Text: %s%n", annotation.getDescription());
//                    System.out.format("Position : %s%n", annotation.getBoundingPoly());
                }
            }
        }
        System.out.println(sb);
//        return sb.toString();
        return strRes;
    }

}
