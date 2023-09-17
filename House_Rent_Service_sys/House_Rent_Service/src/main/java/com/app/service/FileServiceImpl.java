
package com.app.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.FileResponse;

@Service
public class FileServiceImpl implements FileService{

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException {
		//File Name
		
		String name = file.getOriginalFilename();
		
		//Full Path
		String filePath = path + File.separator+name;
		
		//Create Folder if not created
		
		File f =  new File(path);
		
		if(!f.exists()) {
			f.mkdir();
		}
		//file copy
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		return name;
	}
	
//	@Override
//	public List<String> uploadImages(String path, List<MultipartFile> files) throws IOException {
//        List<String> fileNames = new ArrayList<>();
//        
//        for (MultipartFile file : files) {
//            // File Name
//            String name = file.getOriginalFilename();
//            
//            // Full Path
//            String filePath = path + File.separator + name;
//            
//            // Create Folder if not created
//            File f = new File(path);
//            if (!f.exists()) {
//                f.mkdir();
//            }
//            
//            // File copy
//            Files.copy(file.getInputStream(), Paths.get(filePath));
//            
//            fileNames.add(name);
//        }
//        
//        return fileNames;
//    }
	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
	    // TODO Auto-generated method stub
	    String fullpath = path + File.separator + fileName;
	    InputStream is = new FileInputStream(fullpath);
	    return is;
	}
	@Override
	public String updateImage(String path, String fileName, MultipartFile file) throws IOException {
	    String filePath = path + File.separator + fileName + ".jpeg";
	    System.out.println(fileName + "   " + filePath);

	    try (InputStream inputStream = file.getInputStream()) {
	        Files.copy(inputStream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return null; // Return null if the update fails
	    }

	    return fileName;
	}


}
