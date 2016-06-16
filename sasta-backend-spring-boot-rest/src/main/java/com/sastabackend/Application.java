package com.sastabackend;

import com.mangofactory.swagger.plugin.EnableSwagger;
import com.sastabackend.controller.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.SpringApplication;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.MultipartFilter;

@Configuration
@EnableAutoConfiguration
@EnableSwagger
@ComponentScan(basePackages="com.sastabackend")
public class Application extends SpringBootServletInitializer {

    public static void main(final String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    protected final SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    @Bean
    public CommonsMultipartResolver commonsMultipartResolver() {
        final CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
        commonsMultipartResolver.setMaxUploadSize(-1);
        return commonsMultipartResolver;
    }

    @Bean
    public FilterRegistrationBean multipartFilterRegistrationBean() {
        final MultipartFilter multipartFilter = new MultipartFilter();
        final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(multipartFilter);
        filterRegistrationBean.addInitParameter("multipartResolverBeanName", "commonsMultipartResolver");
        return filterRegistrationBean;
    }

}
