package com.app.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.FileResponse;
import com.app.service.FileService;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class FileController {
	
	private static final String File = null;

	@Autowired
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	@PostMapping("/uploadImage")
	public ResponseEntity<FileResponse> fileUpload(@RequestParam("image") MultipartFile image) {
		String fileName = null;
		try {
			fileName = this.fileService.uploadImage(path, image);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponse(null,"Image is not uploded due to internal error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new FileResponse(fileName,"Image is Successfully uploaded"), HttpStatus.OK);
	}
//	@PostMapping("/uploadImages")
//	public ResponseEntity<List<FileResponse>> fileUpload(@RequestParam("images") List<MultipartFile> images) {
//	    List<FileResponse> responses = new ArrayList<>();
//	    
//	    for (MultipartFile image : images) {
//	        try {
//	            String fileName = this.fileService.uploadImage(path, image);
//	            responses.add(new FileResponse(fileName, "Image is Successfully uploaded"));
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	            responses.add(new FileResponse(null, "Image is not uploaded due to internal error"));
//	        }
//	    }
//	    
//	    return new ResponseEntity<>(responses, HttpStatus.OK);
//	}

	@PutMapping("/updateImage/{id}")
    public ResponseEntity<FileResponse> updateImage(@PathVariable String id, @RequestParam("image") MultipartFile image) {
	 	System.out.println("try");
        String fileName = null;
        try {
        	System.out.println("try");
            fileName = this.fileService.updateImage(path, id, image);
            if (fileName == null) {
            	System.out.println("try");
                return new ResponseEntity<>(new FileResponse(null, "Image update failed"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("in");
            return new ResponseEntity<>(new FileResponse(null, "Image update failed due to internal error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        System.out.println("out");
        return new ResponseEntity<>(new FileResponse(fileName + ".jpeg", "Image is successfully updated"), HttpStatus.OK);
    }
	
	@GetMapping(value = "/getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable String id, HttpServletResponse response) throws IOException {
	    InputStream resource = this.fileService.getResource(path, id);
	    response.setContentType(MediaType.IMAGE_JPEG_VALUE);
	    StreamUtils.copy(resource, response.getOutputStream());
	    resource.close();
	}
}

   







