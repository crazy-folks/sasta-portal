/**
 * 
 */
package com.sastabackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;

import com.mangofactory.swagger.configuration.SpringSwaggerConfig;
import com.mangofactory.swagger.models.dto.ApiInfo;
import com.mangofactory.swagger.plugin.EnableSwagger;
import com.mangofactory.swagger.plugin.SwaggerSpringMvcPlugin;

/**
 * @author rohitghatol
 *
 */
@Configuration
@EnableSwagger
public class SwaggerConfig {

    private SpringSwaggerConfig springSwaggerConfig;

    @Autowired
    public void setSpringSwaggerConfig(SpringSwaggerConfig springSwaggerConfig) {
        this.springSwaggerConfig = springSwaggerConfig;        
    }

    @Bean //Don't forget the @Bean annotation
    public SwaggerSpringMvcPlugin customImplementation(){
        return new SwaggerSpringMvcPlugin(this.springSwaggerConfig)
                .apiInfo(apiInfo()).apiVersion("1.0").includePatterns(".*api.*");
    }

    
    public void configureDefaultServletHandling(
            DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
    
    private ApiInfo apiInfo() {
        ApiInfo apiInfo = new ApiInfo(
                "SASTA Restful API Documentation",
                "Social Audit Society of Tamil Nadu - SASTA : \n" +
                        "\n" +
                        "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) enacted on 5th September, 2005 was the first act to make ‘Social Audit’ mandatory. Social Audit is conducted audit conducted jointly by the Government of the people, especially by those people who are affected by, or are the intended beneficiaries of the scheme being audited. Official records are compared against ground realities by the primary stakeholders and the findings are presented in the public platform. The Social Audit process goes beyond accounting for the money that has been spent to examine whether the money was spent properly and has made a difference to people’s lives. Following the Social Audit, Government will take action on the findings and inform the stakeholders of the action taken. Social Audit will promote public participation, deter corruption, address grievances and improve the implementation of the scheme.",
                "http://www.tnsasta.com",
                "sarvaratchagan@outlook.com",
                "Apache License Version 2.0",
                " http://www.apache.org/licenses/LICENSE-2.0"
        );
        return apiInfo;
    }
    // Enable Swagger Reference
    // https://github.com/rohitghatol/springboot-docker-swagger
}