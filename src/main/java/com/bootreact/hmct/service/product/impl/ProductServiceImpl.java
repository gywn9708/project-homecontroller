package com.bootreact.hmct.service.product.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootreact.hmct.entity.Product;
import com.bootreact.hmct.entity.ProductImage;
import com.bootreact.hmct.entity.ProductOption;
import com.bootreact.hmct.entity.Showroom;
import com.bootreact.hmct.mapper.ProductMapper;
import com.bootreact.hmct.repository.ProductImageRepository;
import com.bootreact.hmct.repository.ProductOptionRepository;
import com.bootreact.hmct.repository.ProductRepository;
import com.bootreact.hmct.repository.ShowroomRepository;
import com.bootreact.hmct.service.product.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductMapper productMapper;
	
	@Autowired
	private ProductImageRepository productImageRepository;
	
	@Autowired
	private ProductOptionRepository productOptionRepository;
	
	@Autowired
	private ShowroomRepository showroomRepository;
	
	@Override
	public int insertProduct(Product product){
		productRepository.save(product);
		productRepository.flush();
		return product.getProductNo();
	}
	
	@Override
	public void insertProductFiles(List<ProductImage> fileList) {
		for(ProductImage pi : fileList) {
			int piNo = productMapper.getNextProductImageNo(pi.getProductOption().getProduct().getProductNo());
			pi.setProductImageNo(piNo);
			productImageRepository.save(pi);
		}
	}
	
	@Override
	public void insertProductOption(ProductOption productOption) {
		productOptionRepository.save(productOption);
	}
	
//관리자상품조회
	@Override
	public List<Product> getProductList() {
		
		return productRepository.findAll();
	}

	@Override
	public void updateProduct(Product product) {
		productRepository.save(product);
		
	}
	
	@Override
	public Product findbyProductNo (int productNo) {
		return productRepository.findByProductNo(productNo);
	}
	
	@Override
	public void deleteProduct(Product product) {
		productRepository.delete(product);
		
	}
	
	@Override
	public List<Map<String, Object>> getMainProductList() {		
		return productMapper.getMainProductList();
	}
	
	@Override
	public List<Map<String, Object>> getMainProductImageList() {
		return productMapper.getMainProductImageList();
	}

	@Override
	public void addOption(int productNo, String optionCommonCode, int optionInventory) {
		productMapper.addOption(productNo, optionCommonCode, optionInventory);
	}

	@Override
	public List<Map<String, Object>> getProduct(int productNo) {
		return productMapper.getProduct(productNo);
	}

	@Override
	public List<Map<String, Object>> getProductImage(int productNo) {
		return productMapper.getProductImage(productNo);
	}

	@Override
	public List<Map<String, Object>> getAdminProductList() {
		return productMapper.getAdminProductList();
	}


}
