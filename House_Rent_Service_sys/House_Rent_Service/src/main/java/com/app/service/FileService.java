package com.app.service;



import java.io.*;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
	
	String uploadImage(String path, MultipartFile file) throws IOException;
	//List<String> uploadImages(String path, List<MultipartFile> files)throws IOException;
	String updateImage(String path, String fileName, MultipartFile file) throws IOException;
	InputStream getResource(String path,String fileName) throws FileNotFoundException ;
}
