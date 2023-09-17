package com.app.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CreateAdminHouse;
import com.app.dto.CreateIdProof;
import com.app.dto.CreatePayment;
import com.app.dto.CreateUserHouse;
import com.app.dto.decreseHouseUnit;
import com.app.entity.AdminHouse;
import com.app.entity.ItemType;
import com.app.entity.Location;
import com.app.entity.Role;
import com.app.entity.User;
import com.app.entity.UserHouse;
import com.app.repository.AdminHouseRepository;
import com.app.repository.IDProofServiceRepository;
import com.app.repository.ItemTypeRepository;
import com.app.repository.LocationRepository;
import com.app.repository.UserHouseRepository;
import com.app.repository.UserRepository;
import com.app.service.AdminHouseService;
import com.app.service.BookingService;
import com.app.service.IDProofService;
import com.app.service.LocationService;
import com.app.service.PaymentService;
import com.app.service.UserHouseService;
import com.app.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
//	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private IDProofService idProofService;

	@Autowired
	private IDProofServiceRepository idRepo;

	@Autowired
	private LocationRepository locRepo;
	@Autowired
	private LocationService locService;

	@Autowired
	private AdminHouseService adminHouseService;

	@Autowired
	private ItemTypeRepository itemTypeRepo;

	@Autowired
	private AdminHouseRepository adminHouseRepo;

	@Autowired
	private UserHouseRepository userHouseRepo;

	@Autowired
	private UserHouseService userHouseService;

	@Autowired
	private PaymentService payService;
	@Autowired
	private BookingService bkk;

	@GetMapping("/sum")
	public int sumQuantityOfHouses() {
		return adminHouseService.sumQuantityOfHouses();
	}

	@GetMapping("/countbyadminhouse")
	public long countTotalHouses() {
		return adminHouseService.countTotalHouses();
	}

	@GetMapping("/countlandlord")
	public long countUsersWithUserRoleq() {
		return userRepo.countByRole(Role.LANDLORD);
	}

	@GetMapping("/countuser")
	public long countUsersWithUserRole() {
		return userRepo.countByRole(Role.USER);
	}

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestParam String email, @RequestParam String password) {
		System.out.println("in login user details");

		return new ResponseEntity<>(userRepo.findByEmailAndPassword(email, password), HttpStatus.OK);
	}

	@PostMapping("/regUser")
	public ResponseEntity<?> addNewUser(@RequestBody @Valid User transientUser) {
		System.out.println("in add user " + transientUser);

		return new ResponseEntity<>(userRepo.save(transientUser), HttpStatus.OK);

	}

	@PatchMapping("/{email}")
	public ResponseEntity<?> updatepassword(@RequestBody Map<String, String> password, @PathVariable String email) {

		return new ResponseEntity<>(userService.UpdatePassword(email, password.get("password")), HttpStatus.CREATED);
	}

	@PatchMapping("updateUser/{email}")
	public ResponseEntity<?> updateuser(@RequestBody User user, @PathVariable String email) {
		return new ResponseEntity<>(userService.updatebyId(email, user), HttpStatus.OK);
	}

	@PostMapping("/idProof")
	public ResponseEntity<?> createIdProof(@RequestBody @Valid CreateIdProof request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(idProofService.createNewId(request));
	}

	@PostMapping("/area")
	public ResponseEntity<?> createArea(@RequestBody @Valid Location request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(locRepo.save(request));
	}

	@PutMapping("/updateLocation/{id}")
	public ResponseEntity<?> updateLocation(@PathVariable Long id, @RequestBody Location updatedEntity) {
		System.out.println(id);
		return ResponseEntity.ok().body(locService.updateLocations(id, updatedEntity));
	}

	@PostMapping("/landlordHouse")
	public ResponseEntity<?> createLandlordHouse(@RequestBody @Valid CreateAdminHouse request) {
		System.out.println(request.toString());
		return ResponseEntity.status(HttpStatus.CREATED).body(adminHouseService.createAdminHouse(request));
	}
//
//	@PostMapping("/houseUnit")
//	public ResponseEntity<?> createHouseUnit(@RequestBody @Valid CreateHouseUnit request) {
//		System.out.println(request.toString());
//		return ResponseEntity.status(HttpStatus.CREATED).body(houseUnitService.createHouseUnit(request));
//	}

	@GetMapping("/getUserIdDetails/{id}")
	public ResponseEntity<?> getUserIdDetails(@PathVariable Long id) {
		User user = userRepo.findById(id).get();
		System.out.println(user);
		if (user.equals(null))
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		else {
			return ResponseEntity.status(HttpStatus.OK).body(idRepo.findByUserIdProof(user));

		}
	}

	@GetMapping("getHouseByHouseId/{id}")
	public ResponseEntity<?> getHouseByHouseId(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(adminHouseRepo.findById(id));
	}

	@DeleteMapping("/deleteUserIdProof/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		idRepo.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/getHouseDetailsByItemType/{id}")
	public ResponseEntity<?> getHouseDetailsByItemType(@PathVariable Long id) {
		ItemType itemType = itemTypeRepo.findById(id).get();
		return ResponseEntity.status(HttpStatus.OK).body(adminHouseRepo.findByHouseType(itemType));
	}

	@GetMapping("/getHouseDetailsByUser/{id}")
	public ResponseEntity<?> getHouseDetailsByUser(@PathVariable Long id) {
		System.err.println(id);
		User user = userRepo.findById(id).get();
		return ResponseEntity.status(HttpStatus.OK).body(adminHouseRepo.findByUserHouse(user));
	}

	@GetMapping("/getHouseDetailsByHouseLocation/{id}")
	public ResponseEntity<?> getHouseDetailsByUserId(@PathVariable Long id) {
		Location location = locRepo.findById(id).get();
		return ResponseEntity.status(HttpStatus.OK).body(adminHouseRepo.findByHouseLocation(location));
	}

	@GetMapping("/getAllHouses")
	public ResponseEntity<?> getAllHouses() {
		return ResponseEntity.status(HttpStatus.OK).body(adminHouseRepo.findAll());
	}

	@DeleteMapping("/deleteHouseById/{id}")
	public ResponseEntity<?> deleteHouseById(@PathVariable Long id) {
		adminHouseRepo.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/addItemType")
	public ResponseEntity<?> createItemType(@RequestBody @Valid ItemType request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(itemTypeRepo.save(request));
	}

	@DeleteMapping("/deleteHouseTypeById/{id}")
	public ResponseEntity<?> deleteHouseTypeById(@PathVariable Long id) {
		itemTypeRepo.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/updateHouse/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CreateAdminHouse updatedEntity) {
		System.out.println("location id"+ updatedEntity.getHouseLocationId());
		System.out.println("item type id" + updatedEntity.getHouseTypeId());
		return ResponseEntity.ok().body(adminHouseService.updateAdminHouse(id, updatedEntity));
	}

	@GetMapping("/getIdDetails")
	public ResponseEntity<?> getAllIdProof() {
		return ResponseEntity.status(HttpStatus.OK).body(idRepo.findAll());
	}

	@PostMapping("/adminHouse")
	public ResponseEntity<?> createAdminHouse1(@RequestBody @Valid CreateAdminHouse request) {
		System.err.println(request);
		System.out.println(request.getUserIdProofId());
		//System.out.println(idRepo.findUserIdProofById(request.getUserIdProofId()));
		//User id=idRepo.findUserIdProofById(request.getUserIdProofId());
		User user = userRepo.findById(request.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		user.setRole(Role.LANDLORD);
		userRepo.save(user);
		System.out.println();
		return ResponseEntity.status(HttpStatus.CREATED).body(adminHouseService.createAdminHouse(request));

	}

	@PostMapping("/adminHouse1")
	public ResponseEntity<?> createAdminHouse(@RequestBody @Valid CreateUserHouse request) {
		System.err.println(request);
////		System.out.println(idRepo.findUserIdProofById(request.getUseId()));
////		User id=idRepo.findUserIdProofById(request.getUseId());
//		 User user = userRepo.findById(request.getUseId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//		 
//		 user.setRole(Role.LANDLORD);
//		System.out.println(request.toString());
//		return ResponseEntity.status(HttpStatus.CREATED).body(userHouseService.createUserHouse(request));
		return ResponseEntity.status(HttpStatus.CREATED).body(userHouseService.createUserHouse(request));

	}

//	@GetMapping("/getHouseDetailsByHouseLocation/{id}")
//	public ResponseEntity<?> getHouseDetailsByHouseLocation(@PathVariable Long id) {
//		User user = userRepo.findById(id).get();
//		return ResponseEntity.status(HttpStatus.OK).body(userHouseRepo.findByUserHouse(user));
//	}

	@GetMapping("/getAllItemType")
	public ResponseEntity<?> getAllItemType() {
		return ResponseEntity.status(HttpStatus.OK).body(itemTypeRepo.findAll());
	}

	@GetMapping("/getLoc")
	public ResponseEntity<?> getAllLoc() {
		return ResponseEntity.status(HttpStatus.OK).body(locRepo.findAll());
	}

	@PostMapping("/decreseHouseUnit/{id}")
	public String decreaseProductQuantity(@PathVariable Long id, @RequestBody decreseHouseUnit request) {

		Optional<AdminHouse> optionalhouse = adminHouseRepo.findById(id);
		if (optionalhouse.isPresent()) {
			AdminHouse adminHouse = optionalhouse.get();
			int newQuantity = adminHouse.getQuantity() - request.getQuantity();
			if (newQuantity >= 0) {
				adminHouse.setQuantity(newQuantity);
				adminHouseRepo.save(adminHouse);
			} else {
				throw new RuntimeException("Not enough quantity available.");
			}
		} else {
			throw new RuntimeException("Product not found.");
		}
		return "Updated successfully";
	}

	@GetMapping("/available")
	public List<AdminHouse> getAvailableProducts() {
		return adminHouseRepo.findByQuantityGreaterThan(0);
	}

	@GetMapping("/available1/{id}")
	public Optional<AdminHouse> getAvailableProducts1(@PathVariable Long id) {
		return adminHouseRepo.findById(id);
	}

	@PostMapping("/createPayment")
	public ResponseEntity<?> createPayment(@RequestBody @Valid CreatePayment request) {
		User Customer = userRepo.findById(request.getUserId()).get();
		UserHouse userHouse = userHouseRepo.findById(request.getUserHouseId()).get();
		AdminHouse adminHouse = userHouse.getAdminHouse();
		User user = adminHouse.getUserHouse();
		System.out.println("User" + Customer.toString());
		System.out.println("User" + user.toString());

		bkk.landlordmailBookingHouse(Customer, user);
		bkk.usermailBookingHouse(Customer, user);
//		System.out.println("LandLord"+user);
		System.out.println(request.toString());
		return ResponseEntity.status(HttpStatus.CREATED).body(payService.createNewPayment(request));
	}

}
